use std::collections::HashMap;

use anyhow::Context;

#[derive(
    serde_derive::Serialize,
    serde_derive::Deserialize,
    Clone,
    Copy,
    Debug,
    PartialEq,
    Eq,
    PartialOrd,
    Ord,
    Hash,
    Default,
)]
pub struct RequestIndex(pub u64);

#[derive(serde_derive::Serialize, serde_derive::Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RequestData {
    pub index: RequestIndex,
    pub method: String,
    pub url: String,
    pub headers: HashMap<String, Vec<String>>,
    pub body: Vec<u8>,
}

#[derive(serde_derive::Serialize, serde_derive::Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct ResponseData {
    pub status: u16,
    pub headers: HashMap<String, Vec<String>>,
    pub body: bytes::Bytes,
}

impl ResponseData {
    pub fn to_hyper(&self) -> Result<hyper::Response<hyper::Body>, anyhow::Error> {
        let mut b = hyper::Response::builder().status(self.status);

        for (key, values) in &self.headers {
            for value in values {
                b = b.header(key, value);
            }
        }

        b.body(hyper::Body::from(self.body.clone()))
            .context("could not construct response")
    }
}

impl RequestData {
    pub async fn from_hyper(
        index: RequestIndex,
        req: hyper::Request<hyper::Body>,
    ) -> Result<Self, anyhow::Error> {
        let (parts, body) = req.into_parts();

        let mut headers = HashMap::new();
        for key in parts.headers.keys() {
            // FIXME: allow for non-utf8 values
            let items = parts
                .headers
                .get_all(key)
                .into_iter()
                .map(|v| String::from_utf8_lossy(v.as_bytes()).into_owned())
                .collect();
            headers.insert(key.to_string(), items);
        }

        let body = hyper::body::to_bytes(body)
            .await
            .context("could not read request body")?;

        Ok(RequestData {
            index,
            method: parts.method.to_string(),
            url: parts.uri.to_string(),
            headers,
            body: body.into(),
        })
    }
}

struct IncomingRequestContext {
    pub index: RequestIndex,
    pub body: Option<hyper::Body>,
}

#[derive(Default)]
pub struct JsEnv {
    max_request_index: RequestIndex,
    incoming_requests: HashMap<RequestIndex, IncomingRequestContext>,
}

impl JsEnv {
    pub fn new() -> Self {
        Self::default()
    }

    fn next_index(&mut self) -> RequestIndex {
        let v = self.max_request_index;
        self.max_request_index.0 += 1;
        v
    }

    // pub fn add(&mut self, req: hyper::Request<hyper::Body>) -> RequestData {}
}

use ion::typedarray::ArrayBuffer;

use super::CryptoAlgorithm;

pub struct Md5;

impl CryptoAlgorithm for Md5 {
    fn digest(&self, _params: ion::Object, data: super::BufferSource) -> ion::Result<ArrayBuffer> {
        let data = md5::compute(data.as_slice()).0;
        Ok(ArrayBuffer::from(&data[..]))
    }
}

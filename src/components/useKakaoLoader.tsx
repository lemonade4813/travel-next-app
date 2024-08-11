import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: '0c9800fcf2fe90b7dbc10f3cb1e562ed',
    libraries: ["clusterer", "drawing", "services"],
  })
}
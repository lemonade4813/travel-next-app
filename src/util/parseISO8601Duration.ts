export default function parserISO8601Duration(duration : string){

    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const matches = duration.match(regex);

    // 추출된 값이 있으면 숫자로 변환하고, 없으면 0을 할당합니다.
    const hours = matches?.[1] ? parseInt(matches[1]) : 0;
    const minutes = matches?.[2] ? parseInt(matches[2]) : 0;

    // 결과를 "시간 분" 형식의 문자열로 반환합니다.
    return `${hours}시간 ${minutes}분`;

}
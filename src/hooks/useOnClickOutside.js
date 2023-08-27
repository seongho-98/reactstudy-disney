import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // 모달 안을 클릭 -> 무시
            // ref.current : 모달
            // event.target : 모달안에 요소(이미지, 등등)
            if(!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event); //모달 닫기
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            // 등록된 이벤트 삭제
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
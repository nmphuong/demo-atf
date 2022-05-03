import { keyframes } from "styled-components";

const animateDropShadow = keyframes`
0% {
    filter: drop-shadow(0px 0px 5px #00FF66);
}
50% {
    filter: drop-shadow(0px 0px 10px #00FF66);
}
100% {
    filter: drop-shadow(0px 0px 5px #00FF66);
}
`;

export default animateDropShadow
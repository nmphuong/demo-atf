import styled, { keyframes } from "styled-components";

// --------------------------------------------------
export const Wraper = styled.div`
    padding: 50px 0 50px;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
`;

export const Container = styled.div`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 576px) {
        max-width: 540px;
    }
    @media (min-width: 768px) {
        max-width: 720px;
    }
    @media (min-width: 992px) {
        max-width: 960px;
    }
    @media (min-width: 1200px) {
        max-width: 1140px;
    }
`;

export const Content = styled.div`
    // margin: 450px auto 0;
    position: relative;
`;

export const Map = styled.div`
    background: url(${require('../../../public/images/home/roadmap/roadmap-line.png').default});
    background-position: 55% 85%;
    background-size: 136% 129%;
    background-repeat: no-repeat;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    position: relative;
    gap: 10px;
    @media (max-width: 1199px) {
        display: none;
    }
`;

export const IMap = styled.div`
    position: relative;
    width: 100%;
    &.pd-b {
        padding-bottom: 160px;
    }
`;

export const Background = styled.div`
    height: 100%;
    width: 100%;
    // display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-items: end;
`;

export const BackgroundMap = styled.div`
    width: 100%;
    height: 250px;
    position: relative;
    display: flex;
    justify-content: center;
    @media (max-width: 1199px) {
        :before {
            content: "";
            position: absolute;
            right: 50%;
            top: 98%;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
            background-image: url(${require('../../../public/images/home/roadmap/line.png').default});
            width: 1px;
            height: 90%;
        }
        &.bg-mobile-4:before {
            background: none;
        }
        &.bg-mobile-4:after {
            background: none;
        }
        &.bg-mobile-2:before {
            height: 120%;
        }
        &.bg-mobile-3:before {
            height: 95%;
        }
        :after {
            background-image: url(${require('../../../public/images/home/roadmap/arrow.png').default});
            content: "";
            position: absolute;
            right: 47%;
            top: 120%;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: contain;
            width: 28px;
            height: 32px;
        }
    }
    @media (max-width: 991px) {
        :before {
            content: "";
            position: absolute;
            right: 50%;
            top: 255px;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
            background-image: url(${require('../../../public/images/home/roadmap/line.png').default});
            width: 1px;
            height: 98%;
        }
        &.bg-mobile-4:before {
            background: none;
        }
        &.bg-mobile-2:before {
            height: 127%;
        }
        &.bg-mobile-3:before {
            height: 101%;
        }
        :after {
            background-image: url(${require('../../../public/images/home/roadmap/arrow.png').default});
            content: "";
            position: absolute;
            right: 46%;
            top: 120%;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: contain;
            width: 28px;
            height: 32px;
        }
    }
    @media (max-width: 767px) {
        :after {
            background-image: url(${require('../../../public/images/home/roadmap/arrow.png').default});
            content: "";
            position: absolute;
            right: 45%;
            top: 120%;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: contain;
            width: 28px;
            height: 32px;
        }
    }
    @media (max-width: 479px) {
        :before {
            content: "";
            position: absolute;
            right: 50%;
            top: 243px;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: cover;
            background-image: url(${require('../../../public/images/home/roadmap/line.png').default});
            width: 1px;
            height: 98%;
        }
        &.bg-mobile-4:before {
            background: none;
        }
        &.bg-mobile-2:before {
            height: 127%;
        }
        &.bg-mobile-3:before {
            height: 101%;
        }
        :after {
            background-image: url(${require('../../../public/images/home/roadmap/arrow.png').default});
            content: "";
            position: absolute;
            right: 43.5%;
            top: 120%;
            background-repeat: no-repeat;
            background-position: 50%;
            background-size: contain;
            width: 28px;
            height: 32px;
        }
    }
`;

const animateUpDown = keyframes`
    0% {
        bottom: 85px;
    }
    50% {
        bottom: 105px;
    }
    100% {
        bottom: 85px;
    }
`;

const animateUpDownMobile1199px = keyframes`
    0% {
        bottom: 65px;
    }
    50% {
        bottom: 85px;
    }
    100% {
        bottom: 65px;
    }
`;

const animateUpDownMobile991px = keyframes`
    0% {
        bottom: 45px;
    }
    50% {
        bottom: 25px;
    }
    100% {
        bottom: 45px;
    }
`;

const animateUpDownCustom = keyframes`
    0% {
        bottom: 10px;
    }
    50% {
        bottom: 30px;
    }
    100% {
        bottom: 10px;
    }
`;

export const ImgHero = styled.img`
    width: 100%;
    position: absolute;
    bottom: 30%;
    left: 0;
    @media (min-width: 1200px) {
        &.w-50 {
            transform: translateX(-50%);
            left: 50%;
            width: 50%;
        }
        &.w-70 {
            transform: translateX(-50%);
            left: 50%;
            width: 70%;
        }
        &.w-60 {
            transform: translateX(-50%);
            left: 50%;
            width: 60%;
        }
        &.rm-hero-0 {
            animation: ${animateUpDownCustom} 3s infinite linear;
        }
    }
    animation: ${animateUpDown} 3s infinite linear;
    z-index: 3;
    @media (max-width: 1199px) {
        transform: translateX(-50%);
        left: 50%;
        width: 155px;
        &.w-20vw {
            transform: translateX(-50%);
            left: 50%;
            width: 20vw;
        }
        &.w-10vw {
            transform: translateX(-50%);
            left: 50%;
            width: 10vw;
        }
        &.w-17vw {
            transform: translateX(-50%);
            left: 50%;
            width: 17vw;
        }
        &.w-16vw {
            transform: translateX(-50%);
            left: 50%;
            width: 16vw;
        }
        animation: ${animateUpDownMobile1199px} 3s infinite linear;
    }
    @media (max-width: 991px) {
        transform: translateX(-50%);
        left: 50%;
        width: 155px;
        &.w-20vw {
            transform: translateX(-50%);
            left: 50%;
            width: 22vw;
        }
        &.w-10vw {
            transform: translateX(-50%);
            left: 50%;
            width: 12vw;
        }
        &.w-17vw {
            transform: translateX(-50%);
            left: 50%;
            width: 18vw;
        }
        &.w-16vw {
            transform: translateX(-50%);
            left: 50%;
            width: 18vw;
        }
        animation: ${animateUpDownMobile991px} 3s infinite linear;
    }
    @media (max-width: 600px) {
        &.w-20vw {
            transform: translateX(-50%);
            left: 50%;
            width: 30vw;
        }
        &.w-10vw {
            transform: translateX(-50%);
            left: 50%;
            width: 17vw;
        }
        &.w-17vw {
            transform: translateX(-50%);
            left: 50%;
            width: 25vw;
        }
        &.w-16vw {
            transform: translateX(-50%);
            left: 50%;
            width: 22vw;
        }
    }
    @media (max-width: 479px) {
        &.w-20vw {
            transform: translateX(-50%);
            left: 50%;
            width: 40vw;
        }
        &.w-10vw {
            transform: translateX(-50%);
            left: 50%;
            width: 23vw;
        }
        &.w-17vw {
            transform: translateX(-50%);
            left: 50%;
            width: 30vw;
        }
        &.w-16vw {
            transform: translateX(-50%);
            left: 50%;
            width: 27vw;
        }
    }
`;

export const ImgMap = styled.img`
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1;
    @media (max-width: 1199px) {
        width: 50%;
    }
    @media (max-width: 767px) {
        width: 70%;
    }
    @media (max-width: 600px) {
        width: 70%;
    }
    @media (max-width: 479px) {
        width: 90%;
    }
    &.mobile {
        bottom: -40px;
    }
`;

export const List = styled.ul`
    text-align: left;
    list-style: none;
    padding: 0;
`;

export const Item = styled.li<{icon?: string}>`
    color: #fff;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 23px;
    font-family: Raleway;
    position: relative;
    padding-left: 16px;
    padding-bottom: 8px;
    :before {
        content: '';
        position: absolute;
        left: 0;
        top: 5px;
        width: 18px;
        height: 18px;
        background: url(${({icon}) => icon}) no-repeat;
    }
`;

export const Main = styled.div`
    // 
`;

export const Footer = styled.div`
    // 
`;

export const RoadMapContent = styled.div`
    @media (min-width: 1200px) {
        display: flex;
        justify-content: center;
    }
`;

export const IRoadMap = styled.div`
`;

export const TitleRoadMap = styled.p<{color?: string}>`
    font-family: 'Gemunu Libre', sans-serif;
    font-style: normal;
    font-weight: 800;
    font-size: 35px;
    line-height: 38px;
    margin-bottom: 20px;
    text-align: left;
    color: ${({ color }) => color};
`;

export const MapMobile = styled.div`
    @media (min-width: 1200px) {
        display: none;
    }
`;

export const IMapMobile = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    position: relative;
    gap: 10px;
    padding: 20px 0px;
`;

import styled, { keyframes } from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: 0px;
    box-sizing: border-box;
    background-size: cover;
    background-position: bottom;
    background-repeat: no-repeat;
    position: relative;
    z-index: 999;
`;

export const Content = styled.div`
    width: 100%;
    height: 100%;
    padding: 120px 0 77px 0px;
    box-sizing: border-box;
`;

export const SectionContent = styled.div`
    width: 90%;
    height: 100%;
    margin: auto;
    position: relative;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    @media (max-width: 767px) {
        width: 100%;
        display: block;
    }
`;

export const ContentLeft = styled.div`
    width: 50%;
    @media (max-width: 767px) {
        display: none;
    }
`;

export const ContentRightCarousel = styled.div`
    width: 50%;
    @media (min-width: 768px) {
        display: none;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`;

export const ContentRight = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    @media (max-width: 767px) {
        width: 100%;
    }
`;



export const SectionHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Right = styled.div`
    text-align: center;
    width: 100%;
`;

export const Description = styled.p`
    padding: 20px 30px;
    color: #fff;
	font-family: Gelasio;
`;

export const GroupAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    @media (max-width: 991px) {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
    }
    @media (max-width: 767px) {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
`;

const spinButton = keyframes`
`;

export const Action = styled(NavLink)`
    color: rgba(255, 230, 104, 1);
    padding: 11px 28px;
    position: relative;
    border: 1px solid rgba(255, 230, 104, 1);
    border-radius: 5px;
    overflow: hidden;
    transition: all .5s;
    :hover {
        color: rgba(255, 230, 104, 1);
        text-decoration: none;
        box-shadow: 3px 3px 6px 2px rgb(183 183 183 / 60%);
    }
`;

export const ReadMore = styled(NavLink)`
    white-space: nowrap;
    color: rgba(255, 230, 104, 1);
    padding: 11px 28px;
    border: 1px solid rgba(255, 230, 104, 1);
    border-radius: 5px;
    transition: all .5s;
    :hover {
        color: rgba(255, 230, 104, 1);
        text-decoration: none;
        box-shadow: 3px 3px 6px 2px rgb(183 183 183 / 60%);
    }
    @media (max-width: 767px) {
        display: none;
    }
`;
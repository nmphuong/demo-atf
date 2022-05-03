import styled from "styled-components";

export const Wrapper = styled.div<{backgroundLogoMobile?: string, backgroundMobile?: string}>`
    .banner-centered:before {
        background: url(${({ backgroundLogoMobile }) => backgroundLogoMobile});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    @media (max-width: 1024px) {
        .banner {
            background: url(${({ backgroundMobile }) => backgroundMobile});
            background-position: center;
            background-size: 100% 100%;
        }
    }
`;
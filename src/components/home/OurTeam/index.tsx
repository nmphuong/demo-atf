import React, { memo } from "react";
import Carousel from "./Carousel";

import {
    Content,
    SectionContent,
    Wrapper
} from './styled'

const OurTeam = () => {
    return (
        <>
            <Wrapper>
                <Content>
                    <SectionContent>
                        <Carousel />
                    </SectionContent>
                </Content>
            </Wrapper>
        </>
    )
}

export default memo(OurTeam)
import React, { memo } from "react";

import {
    Background,
    BackgroundMap,
    Container,
    Content,
    Footer,
    IMap,
    IMapMobile,
    ImgHero,
    ImgMap,
    IRoadMap,
    Item,
    List,
    Map,
    MapMobile,
    RoadMapContent,
    TitleRoadMap,
    Wraper
} from './styled'

import { RoadmapData } from './settingRoadMap'

const Roadmap = () => {

    return (
        <>
            <Wraper>
                <Container>
                    <Content>
                        <Map>
                            {
                                RoadmapData.map((item, index) => (
                                    <IMap key={index}>
                                        <Background>
                                            {
                                                index % 2 != 0
                                                ? (
                                                    <BackgroundMap>
                                                        { item.hero ? <ImgHero className={item.classHero} src={require(`../../../public/images/home/roadmap/${item.hero}`).default} alt="hero" /> : '' }
                                                    </BackgroundMap>
                                                ) : ''
                                            }
                                            <RoadMapContent className={`rm-${index}`}>
                                                <IRoadMap>
                                                    <TitleRoadMap color={item.color} className="roadmap-title-1">{item.time}</TitleRoadMap>
                                                    <List>
                                                        {
                                                            item.content.map((it, idx) => (
                                                                <Item icon={require(`../../../public/images/home/roadmap/${item.iconList}`).default} key={idx}>{it}</Item>
                                                            ))
                                                        }
                                                    </List>
                                                </IRoadMap>
                                            </RoadMapContent>
                                            {
                                                index % 2 == 0
                                                ? (
                                                    <BackgroundMap>
                                                        { item.hero ? <ImgHero className={`${item.classHero} rm-hero-${index}`} src={require(`../../../public/images/home/roadmap/${item.hero}`).default} alt="hero" /> : '' }
                                                    </BackgroundMap>
                                                ) : ''
                                            }
                                        </Background>
                                    </IMap>
                                ))
                            }
                        </Map>
                        <MapMobile>
                            {
                                    RoadmapData.map((item, index) => (
                                        <IMapMobile key={index}>
                                            <BackgroundMap className={`bg-mobile-${index}`}>
                                                { item.hero ? <ImgHero className={item.classHero} src={require(`../../../public/images/home/roadmap/${item.hero}`).default} alt="hero" /> : '' }
                                                { item.place ? <ImgMap className="mobile" src={require(`../../../public/images/home/roadmap/${item.place}`).default} alt="hero" /> : '' }
                                            </BackgroundMap>
                                            <RoadMapContent>
                                                <IRoadMap>
                                                    <TitleRoadMap color={item.color} className="roadmap-title-1">{item.time}</TitleRoadMap>
                                                    <List>
                                                        {
                                                            item.content.map((it, idx) => (
                                                                <Item icon={require(`../../../public/images/home/roadmap/${item.iconList}`).default} key={idx}>{it}</Item>
                                                            ))
                                                        }
                                                    </List>
                                                </IRoadMap>
                                            </RoadMapContent>
                                        </IMapMobile>
                                    ))
                            }
                        </MapMobile>
                    </Content>
                </Container>
            </Wraper>
        </>
    )
}

export default memo(Roadmap)
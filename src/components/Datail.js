import styled from "styled-components";
import db from "../firebase";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const col = collection(db, "movies");
      const snapshot = await getDocs(col);
      snapshot.docs.forEach((doc) => {
        if (doc.id === id) {
          setData(doc.data());
        }
      });
    })();
  }, [id]);

  return (
    <Container>
      <Background>
        {data && <img src={data.backgroundImg} alt={data.title} />}
      </Background>
      <ImgTitle>
        {data && <img src={data.titleImg} alt={data.title} />}
      </ImgTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <Group>
            <img src="/images/group-icon.png" alt="" />
          </Group>
        </Controls>
        <SubTitle>{data && data.subTitle}</SubTitle>
        <Description>{data && data.description}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
  left: 0px;
  position: fixed;
  opacity: 0.8;
  right: 0px;
  top: 0px;
  z-index: -1;

  img {
    width: 100vw;
    height: : 100vh;

    @media (max-width: 768px){
      width: initial;
    }
  }
`;

const ImgTitle = styled.div`
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  margin: 0px auto;
  height: 30vw;
  min-height: 170px;
  padding-bottom: 24px;
  width: 100%;
  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 24px 0px;
  min-height: 56px;
`;

const Player = styled.button`
  font-size: 15px;
  margin: 0px 22px 0px 0px;
  padding: 0px 24px;
  height: 56px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  background: rgb(255, 255, 255);
  border: none;
  color: rgb(0, 0, 0);

  img {
    width: 32px;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img {
      width: 25px;
    }
  }
`;

const Trailer = styled(Player)`
  background: rgb(0, 0, 0, 0.3);
  border: 1px solid rgb(255, 255, 255);
  color: rgb(255, 255, 255);
`;

const AddList = styled.div`
  margin-right: 16px;
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 2px solid white;
  cursor: pointer;

  span {
    background-color: rgb(255, 255, 255);
    display: inline-block;

    &:first-child {
      height: 2px;
      transform: translate(1px, 0px) rotate(0deg);
      width: 16px;
    }

    &:last-child {
      height: 16px;
      transform: translateX(-8px) rotate(0deg);
      width: 2px;
    }
  }
`;

const Group = styled(AddList)`
  img {
    width: 100%;
    height: 100%;
  }
`;

const SubTitle = styled.div`
  color: rgb(255, 255, 255);
  font-size: 15px;
  min-height: 20px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Description = styled.div`
  line-height: 1.4;
  font-size: 20px;
  padding: 16px 0px;
  color: rgb(255, 255, 255);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default Detail;

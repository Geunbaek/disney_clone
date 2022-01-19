import styled from "styled-components";
import { Link } from "react-router-dom";
import { selectOriginal } from "../features/movie/movieSlice";
import { useSelector } from "react-redux";

const Originals = () => {
  const originals = useSelector(selectOriginal);
  return (
    <Container>
      <h4>Original</h4>
      <Content>
        {originals &&
          originals.map((original) => {
            return (
              <Wrap key={original.id}>
                <Link to={`/detail/` + original.id}>
                  <img src={original.cardImg} alt={original.title} />
                </Link>
              </Wrap>
            );
          })}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 0 26px;
`;
const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms;
  border: 3px solid rgba(255, 255, 255, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: opacity 500ms ease-in-out 0s;
    width: 100%;
    z-index: 1;
    top: 0;
  }

  &:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.8);
  }
`;

export default Originals;

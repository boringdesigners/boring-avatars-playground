import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  SegmentGroup,
  Segment,
  Button,
  BaseStyles,
  ColorDot,
} from "./ui-system";
import colors from "nice-color-palettes/1000";
import { exampleNames } from "./example-names";
import Avatar from "boring-avatars";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useMedia } from "./hooks";
import { Github, RoundCorner, SquareCorner } from "./icons";
import { useNavigate } from "react-router-dom";

const paletteColors = colors;

const Header = styled.header`  
  max-width: 40ch;
  
  h1 {
    font-size: 0.875rem;
    margin: 0;
    display: inline;
  }

  p {
    display: inline;
  }

  div {
    margin-top: var(--sp-m);
    display: flex;
    align-items: center;
    gap: var(--sp-s);
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  height: 100vh;
  position: sticky;
  top: 0;
  padding: var(--sp-l);
  display: flex;
  flex-direction: column;
  font-family: "SF Mono", SFMono-Regular, ui-monospace, "DejaVu Sans Mono",
    Menlo, Consolas, monospace;
  font-weight: normal;
  font-size: 0.875rem;
  gap: var(--sp-xxl);
  background-color: #f8f8f8;

  @media (max-width: 920px) {
    height: auto;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 260px;  
  }
  
  @media (max-width: 560px) { 
    display: flex;
    flex-direction: column;
    gap: var(--sp-xl);
  }
`;

const Main = styled.main`
  display: grid;
`;

const Footer = styled.footer`
  padding: var(--sp-m) var(--pagePadding) var(--sp-xl);

  h2 {
    font-size: 0.75rem;
    margin: 0;
  }

  p {
    font-family: "SF Mono", SFMono-Regular, ui-monospace, "DejaVu Sans Mono",
      Menlo, Consolas, monospace;
    font-weight: normal;
    font-size: 0.75rem;
    line-height: 1.5;
  }
`;

const ColorsSection = styled.div`
  display: inline-grid;
  align-items: center;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--sp-s);
  background-color: var(--c-button);
  padding: 0.3rem 0.3rem 0.3rem 0.6rem;
  border-radius: 10rem;
`;

const AvatarsGrid = styled.div`
  display: grid;
  grid-gap: var(--sp-m);
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  padding: var(--sp-l) var(--pagePadding);
`;

const ButtonSection = styled.div`
  display: grid;
  place-items: center;
  opacity: 0;
  transition: 0.5s 0s;
`;

const AvatarContainer = styled.div`
  display: grid;
  font-size: 0.8rem;

  &:hover ${ButtonSection} {
    opacity: 1;
    transition: 0.2s 0.1s;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: var(--textbox);
  font: inherit;
  color: inherit;
  border: 1px solid transparent;
  transition: 0.5s;
  width: 100%;
  text-align: center;
  border-radius: 100rem;
  background: transparent;
  margin-top: var(--sp-s);

  &:hover {
    border-color: var(--c-fieldHover);
    transition: 0.2s;
  }

  &:focus {
    border-color: var(--c-fieldFocus);
    outline: none;
  }
`;

const AvatarWrapper = ({ name, playgroundColors, size, variant, square }) => {
  const [avatarName, setAvatarName] = useState(name);
  const handleFocus = (event) => event.target.select();
  const ref = useRef();
  const [copyValue, setCopyValue] = useState(name);

  useEffect(() => {
    if (ref.current) {
      const svgNode = ref.current.innerHTML;
      const svgStart = svgNode.indexOf("<svg");
      const svgEnd = svgNode.indexOf("</svg>") + 6;
      const svgResult = svgNode.substring(svgStart, svgEnd).toString();

      setCopyValue(svgResult);
    }
  }, [copyValue, variant, playgroundColors, avatarName]);

  return (
    <AvatarContainer>
      <AvatarSection className="Avatar" ref={ref}>
        <Avatar
          name={avatarName}
          colors={playgroundColors}
          size={size}
          variant={variants[variant]}
          square={square}
        />
      </AvatarSection>
      <Input
        value={avatarName}
        onChange={(e) => setAvatarName(e.target.value)}
        onFocus={(e) => handleFocus(e)}
      />
      <ButtonSection>
        <CopyToClipboard text={copyValue}>
          <Button>Copy SVG</Button>
        </CopyToClipboard>
      </ButtonSection>
    </AvatarContainer>
  );
};

const getRandomPaletteIndex = () =>
  Math.floor(Math.random() * paletteColors.length);

const avatarSizes = {
  small: 40,
  medium: 80,
  large: 128,
};

const shapes = {
  round: {
    isSquare: false,
    icon: <RoundCorner />,
  },
  square: {
    isSquare: true,
    icon: <SquareCorner />,
  },
};

const Settings = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--sp-m);
`;

const ShapeSelection = styled.div`
  display: grid;
  grid-gap: var(--sp-s);
  grid-template-columns: auto auto;
  align-items: center;
`;

const variants = {
  beam: "beam",
  marble: "marble",
  pixel: "pixel",
  sunset: "sunset",
  bauhaus: "bauhaus",
  ring: "ring",
};

const Playground = () => {
  const [playgroundColors, setPlaygroundColors] = useState([
    "#0a0310",
    "#49007e",
    "#ff005b",
    "#ff7d10",
    "#ffb238",
  ]);

  const [dotColor0, setDotColor0] = useState(playgroundColors[0]);
  const [dotColor1, setDotColor1] = useState(playgroundColors[1]);
  const [dotColor2, setDotColor2] = useState(playgroundColors[2]);
  const [dotColor3, setDotColor3] = useState(playgroundColors[3]);
  const [dotColor4, setDotColor4] = useState(playgroundColors[4]);

  const [square, setSquare] = useState(false);

  const filteredColors = [
    dotColor0,
    dotColor1,
    dotColor2,
    dotColor3,
    dotColor4,
  ];

  const navigate = useNavigate();

  const handleRandomColors = () => {
    const colorRange = paletteColors[getRandomPaletteIndex()];
    setPlaygroundColors(colorRange);

    const color0 = colorRange[0].replace("#", "");
    const color1 = colorRange[1].replace("#", "");
    const color2 = colorRange[2].replace("#", "");
    const color3 = colorRange[3].replace("#", "");
    const color4 = colorRange[4].replace("#", "");

    navigate(`${color0}-${color1}-${color2}-${color3}-${color4}`);
  };
  useEffect(() => {
    setDotColor0(playgroundColors[0]);
    setDotColor1(playgroundColors[1]);
    setDotColor2(playgroundColors[2]);
    setDotColor3(playgroundColors[3]);
    setDotColor4(playgroundColors[4]);
  }, [playgroundColors]);

  const [avatarSize, setAvatarSize] = useState(avatarSizes.medium);
  const [variant, setVariant] = useState(variants.beam);

  const variantWidth = useMedia(
    ["(max-width: 1080px)", "(min-width: 1080px)"],
    ["100%", "auto"],
    "auto"
  );

  return (
    <>
      <BaseStyles />
      <Layout>
        <Sidebar>
          <Header>
            <h1>Boring avatars</h1>{" "}
            <p>
              is an open source React library to generate unique SVG-based
              avatars from usernames and color palettes.
            </p>
            <div>
              <Button
                as="a"
                href="https://github.com/boringdesigners/boring-avatars"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Visit Github repository"
                icon={<Github />}
              />
              <Button
                as="a"
                href="http://www.github.com/sponsors/boringdesigners"
                target="_blank"
                rel="noreferrer noopener"
              >
                Become a sponsor
              </Button>
            </div>
          </Header>
          <Settings>
            <SegmentGroup fullWidth width={variantWidth}>
              {Object.keys(variants).map((variantItem, i) => (
                <Segment
                  key={i}
                  onClick={() => setVariant(variants[variantItem])}
                  isSelected={variantItem === variant}
                  icon={
                    <Avatar
                      variant={variants[variantItem]}
                      size={"26"}
                      name={variants[variantItem]}
                      colors={
                        variantItem === variant ? filteredColors : undefined
                      }
                    />
                  }
                ></Segment>
              ))}
            </SegmentGroup>
            <ColorsSection>
              <ColorDot
                value={dotColor0}
                onChange={(color) => setDotColor0(color)}
              />
              <ColorDot
                value={dotColor1}
                onChange={(color) => setDotColor1(color)}
              />
              <ColorDot
                value={dotColor2}
                onChange={(color) => setDotColor2(color)}
              />
              <ColorDot
                value={dotColor3}
                onChange={(color) => setDotColor3(color)}
              />
              <ColorDot
                value={dotColor4}
                onChange={(color) => setDotColor4(color)}
              />
              <Button onClick={() => handleRandomColors()}>Random</Button>
            </ColorsSection>
            <ShapeSelection>
              <SegmentGroup>
                {Object.keys(shapes).map((shapeItem, index) => (
                  <Segment
                    key={index}
                    onClick={() => setSquare(shapes[shapeItem].isSquare)}
                    isSelected={shapes[shapeItem].isSquare === square}
                    icon={shapes[shapeItem].icon}
                  />
                ))}
              </SegmentGroup>
              <SegmentGroup>
                {Object.entries(avatarSizes).map(([key, value], index) => (
                  <Segment
                    key={index}
                    onClick={() => setAvatarSize(value)}
                    aria-label={"Change size to " + value}
                    isSelected={value === avatarSize}
                    icon={
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <rect
                          width="100%"
                          height="100%"
                          transform-origin="50% 50%"
                          transform={`scale(${(index + 1.2) * 0.28})`}
                          rx={square ? 0 : 40}
                        />
                      </svg>
                    }
                  />
                ))}
              </SegmentGroup>
            </ShapeSelection>
          </Settings>
        </Sidebar>
        <div>
          <Main>
            <AvatarsGrid>
              {exampleNames.map((exampleName, name) => (
                <AvatarWrapper
                  key={name}
                  size={avatarSize}
                  name={exampleName}
                  playgroundColors={filteredColors}
                  variant={variant}
                  square={square}
                />
              ))}
            </AvatarsGrid>
          </Main>
          <Footer>
            <p>
              Names from{" "}
              <a
                href="https://notablewomen.withgoogle.com/all"
                target="_blank"
                rel="noreferrer noopener"
              >
                Notable Women
              </a>{" "}
              · Colors from the{" "}
              <a
                href="https://github.com/Jam3/nice-color-palettes"
                target="_blank"
                rel="noreferrer noopener"
              >
                Nice Color Palettes
              </a>{" "}
              · Made by{" "}
              <a
                href="https://hayk.design/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Hayk An
              </a>{" "}
              and{" "}
              <a
                href="https://josepmartins.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Josep Martins
              </a>
              .
            </p>
          </Footer>
        </div>
      </Layout>
    </>
  );
};

export default Playground;

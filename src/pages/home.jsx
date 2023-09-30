import {
  Title,
  Text,
  Container,
  Button,
  Overlay,
  SimpleGrid,
  Card,
  Image,
  Flex,
} from "@mantine/core";
import heroClasses from "./HomeHero.module.css";
import cardClasses from "./Card.module.css";
import { NavLink, useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await fetch("http://localhost:3000/api/");
  const boards = await response.json();

  return {
    boards,
  };
}

export default function PageHome() {
  const data = useLoaderData();

  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };

  const cards = data.boards.map((board) => (
    <Card withBorder radius="md" className={cardClasses.card} key={board.name}>
      <Card.Section>
        <a {...linkProps}>
          <Image
            src="https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2Fzx3qmy88dkv51.jpg&rdt=61505"
            height={180}
          />
        </a>
      </Card.Section>

      <Text className={cardClasses.title} component="a" {...linkProps}>
        {board.name}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {board.desc}
      </Text>

      <Flex>
        <NavLink to={`/board/${board.id}/detail`}>
          <Button mt="sm">View Post</Button>
        </NavLink>
      </Flex>
    </Card>
  ));

  return (
    <>
      <div className={heroClasses.wrapper}>
        <Overlay color="#000" opacity={0.65} zIndex={1} />

        <div className={heroClasses.inner}>
          <Title className={heroClasses.title}>
            Share your boards to the world{" "}
            <Text component="span" inherit className={heroClasses.highlight}>
              for everyone to see!
            </Text>
          </Title>

          <Container size={640}>
            <Text size="lg" className={heroClasses.description}>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit...
            </Text>
          </Container>

          <div className={heroClasses.controls}>
            <NavLink to="/board/create">
              <Button className={heroClasses.control} variant="white" size="lg">
                Create your post
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      <Container py="xl">
        <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
      </Container>
    </>
  );
}

import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { Link, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/api/board/${params.id}/details`
  );
  const board = await response.json();

  return {
    board,
  };
}

export default function PageBoardDetail() {
  const data = useLoaderData();

  return (
    <Container>
      <Flex align="center" gap="xl">
        <Image
          maw={450}
          radius="md"
          src="https://keycult.com/cdn/shop/products/Website-2_1440x1440.jpg?v=1646236960"
          alt="Shoe img"
        />

        <Flex direction="column" gap="xs">
          <Flex direction="column" gap="xs" style={{ width: 500 }}>
            <Title order={1}>{data.board.name}</Title>

            <Text size="xl">Brand: {data.board.brand}</Text>

            <Text size="md">Layout: {data.board.layout}</Text>

            <Title order={2} color="blue">
              Rp {data.board.price}
            </Title>

            <Text size="md">{data.board.desc}</Text>
          </Flex>

          <Group position="left" mt="sm">
            <Button
              component={Link}
              to={`/board/${data.board.id}/edit`}
              color="purple"
              variant="outline"
            >
              Edit Shoe
            </Button>

            <Button
              component={Link}
              to="/"
              variant="outline"
              leftIcon={<IconArrowBack />}
            >
              Back
            </Button>
          </Group>
        </Flex>
      </Flex>
    </Container>
  );
}

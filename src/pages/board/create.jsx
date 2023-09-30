import {
  Link,
  redirect,
  Form,
  useNavigation,
  useActionData,
} from "react-router-dom";
import {
  Button,
  Container,
  // FileInput,
  Flex,
  Group,
  NumberInput,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { z } from "zod";

export async function action({ request }) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const createBoardSchema = z.object({
    name: z.string().nonempty({
      message: "Data can't be empty!",
    }),
    brand: z.string().nonempty(),
    layout: z.string().nonempty({
      message: "Data can't be empty!",
    }),
    price: z.coerce.number().gte(0),
    desc: z.string().nonempty(),
  });

  const createBoard = createBoardSchema.safeParse(payload);
  if (!createBoard.success) {
    return { errors: createBoard.error.flatten() };
  }

  await fetch("http://localhost:3000/api/board/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return redirect("/");
}

export default function PageBoardCreate() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData();
  const errors = actionData?.errors?.fieldErrors;

  return (
    <Container>
      <Flex direction="row" align="center" justify="space-between" mb="md">
        <Title order={3} color="blue.5">
          Add Post
        </Title>
        <Button component={Link} to="/" variant="outline">
          Back
        </Button>
      </Flex>

      <Form
        method="post"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextInput
          withAsterisk
          size="md"
          label="Name"
          placeholder="Input board name"
          name="name"
          required
          error={errors?.name?.[0]}
        />

        <TextInput
          withAsterisk
          size="md"
          label="Brand"
          placeholder="Input board brand"
          name="brand"
          required
          error={errors?.brand?.[0]}
        />

        <TextInput
          withAsterisk
          size="md"
          label="Layout"
          placeholder="Board Layout"
          name="layout"
          required
          error={errors?.layout?.[0]}
        />

        <NumberInput
          withAsterisk
          size="md"
          label="Price"
          placeholder="Input board price"
          name="price"
          required
          error={errors?.price?.[0]}
        />

        <Textarea
          withAsterisk
          size="md"
          placeholder="Input board desc"
          label="Description"
          name="desc"
          required
          error={errors?.desc?.[0]}
        />

        {/* <FileInput
          label="Keyboard Image"
          description="choose image"
          placeholder="Image"
          name="img"
        /> */}

        <Group position="left" mt="md">
          <Button type="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Group>
      </Form>
    </Container>
  );
}

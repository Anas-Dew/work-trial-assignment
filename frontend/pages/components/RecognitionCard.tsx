import React from "react";
import { IconHeart } from "@tabler/icons-react";
import { Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
	},

	section: {
		borderBottom: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		paddingBottom: theme.spacing.md,
	},

	

	label: {
		textTransform: "uppercase",
		fontSize: theme.fontSizes.xs,
		fontWeight: 700,
	},
}));

interface RecognitionCardProps {
	data: dataObject;
}

interface dataObject {
	date_posted: string;
	image: string;
	team_name: string;
	message: string;
	total_claps: number;
	id: number;
	giver_alias: string;
	team_id: number;
	receiver_names: string[]
}

const RecognitionCard: React.FC<RecognitionCardProps> = ({ data }) => {
	const { classes } = useStyles();

	let date = new Date(data.date_posted).toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		// hour: '2-digit',
		// minute: '2-digit',
		// second: '2-digit',
		// timeZoneName: 'short',
	});
	return (
		<Card withBorder radius="md" p="md" className={classes.card}>
			<Card.Section>
				<Image
					src={data.image || "https://cdn-icons-png.flaticon.com/512/3135/3135783.png"}
					alt={data.team_name}
					style={{ scale: "0.7" }}
					height={200}
					width={200}
					className="m-auto"
				/>
			</Card.Section>

			<Card.Section className={classes.section} mt="md">
				<Group position="apart">
					<Text fz="lg" fw={500}>
						{data.team_name}
					</Text>
					<Badge size="sm">{data.id}</Badge>
				</Group>
				<Text fz="sm" mt="xs">
					Given by {data.giver_alias} on {date}
				</Text>
				<Text fz="sm" mt="xs">
					{data.message}
				</Text>

				<Text fz="sm" mt="xs">
					Received by
				</Text>
				<Group spacing={7} mt={0}>
					{data.receiver_names.map((receiver_name) => {
						return (
							<Badge color={"dark"} key={receiver_name} leftSection={"🏆"}>
								{receiver_name}
							</Badge>
						);
					})}
				</Group>
			</Card.Section>

			{/* <br /> */}
			<Card.Section className={classes.section}>
				<Group spacing={7} mt={0}>
					<Badge color={"dark"} key={data.total_claps} leftSection={"👏"}>
						{data.total_claps}
					</Badge>
					<Badge color={"dark"} key={data.team_id} leftSection={"🫂"}>
						{data.team_id}
					</Badge>
				</Group>
			</Card.Section>

			{/* <Group mt="xs">
				<Button radius="md" style={{ flex: 1 }}>
					Show details
				</Button>
				<ActionIcon variant="default" radius="md" size={36}>
					👏
				</ActionIcon>
			</Group> */}
		</Card>
	);
};

export default RecognitionCard;

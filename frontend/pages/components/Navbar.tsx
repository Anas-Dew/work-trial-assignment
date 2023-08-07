import React, { useState } from "react";
import { createStyles, Header, Group, Burger, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { TextInput, ActionIcon, useMantineTheme } from "@mantine/core";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
	header: {
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
	},

	inner: {
		height: rem(56),
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},

	links: {
		[theme.fn.smallerThan("md")]: {
			display: "none",
		},
	},

	search: {
		[theme.fn.smallerThan("xs")]: {
			display: "none",
		},
	},

	link: {
		display: "block",
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: "none",
		color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		"&:hover": {
			backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},
}));

export function HeaderSearch({ searchData }) {
	const [opened, { toggle }] = useDisclosure(false);
	const { classes } = useStyles();
	const theme = useMantineTheme();

	const [Query, setQuery] = useState({ query: "" });
	const onChange = (event: any) => {
		setQuery({ ...Query, [event.target.name]: event.target.value });
	};
	const search_trigger = () => {
		searchData(Query.query);
	};
	return (
		<Header height={56} className={classes.header} mb={50}>
			<div className={classes.inner}>
				<Group>
					<Burger opened={opened} onClick={toggle} size="sm" />
					{/* <MantineLogo size={28} /> */}
				</Group>

				<Group className="m-auto">
					<TextInput
						className="w-[23rem]"
						icon={<IconSearch size="1.1rem" stroke={1.5} />}
						radius="xl"
						size="md"
						rightSection={
							<ActionIcon
								onClick={search_trigger}
								size={32}
								radius="xl"
								color={theme.primaryColor}
								variant="filled"
							>
								{theme.dir === "ltr" ? (
									<IconArrowRight size="1.1rem" stroke={1.5} />
								) : (
									<IconArrowLeft size="1.1rem" stroke={1.5} />
								)}
							</ActionIcon>
						}
						value={Query.query}
						placeholder="Giver, receiver, message and value"
						rightSectionWidth={49}
						onChange={onChange}
						name="query"
					/>
				</Group>
			</div>
			<h2 className="mb-4 mt-4 text-center text-3xl">Recognitions</h2>
		</Header>
	);
}

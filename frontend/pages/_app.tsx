import "../styles/globals.css";
import React, { useState } from "react";
import type { AppProps } from "next/app";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { reactQueryClient } from "configs";
import { ModalsProvider } from "@mantine/modals";


const myCache = createEmotionCache({ key: "mantine", prepend: false });

function MyApp({ Component, pageProps }: AppProps) {
	// Itentionally did prop drilling technique for state management. because it's a little app.
	const [ResponseData, setResponseData] = useState<object[]>([]);
	return (
		<QueryClientProvider client={reactQueryClient}>
			<MantineProvider withGlobalStyles withNormalizeCSS emotionCache={myCache}>
				<ModalsProvider>
					<Component ResponseData={ResponseData} setResponseData={setResponseData} {...pageProps} />
				</ModalsProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default MyApp;

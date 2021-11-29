import { Box, chakra, Flex, Image, Text } from '@chakra-ui/react'
import images from 'assets/images'
import { Post } from 'core/post/post.entity'
import { PostService } from 'core/post/post.service'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import styles from './Post.module.scss'
interface Params extends ParsedUrlQuery {
	slug: string
}

interface Props {
	post: Post
}

const PostPage: NextPage<Props> = ({ post }) => {
	const {
		id,
		slug,
		title,
		content,
		created_at,
		coverUrl,
		description,
		author,
		tags,
		mdxSource,
	} = post

	let { name, avatarUrl } = author || {}
	name = name || 'Anonymous'

	return (
		<Box h="100%">
			<Head>
				<title>{title}</title>
				<meta property="og:title" content={`${title}`} key="title" />
			</Head>
			<Box
				bgImage={coverUrl ?? images.blog.placeholder.src}
				width="100%"
				height={400}
				backgroundSize="cover"
				backgroundRepeat="no-repeat"
				backgroundPosition="center"
				position="relative"
				mb="80px"
			>
				<Flex
					flexDirection="column"
					align="center"
					justify="center"
					width="100%"
					height="100%"
					bgColor="blackAlpha.700"
				>
					<Text
						fontWeight={600}
						color="white"
						w="100%"
						fontSize="5xl"
						textShadow="1px 1px #000000"
						align="center"
						noOfLines={1}
						textOverflow="ellipsis"
					>
						{title}
					</Text>
					<Text
						mt={2}
						fontWeight={500}
						color="white"
						w="100%"
						fontSize="xl"
						textShadow="1px 1px #000000"
						align="center"
						noOfLines={1}
						textOverflow="ellipsis"
					>
						{description}
					</Text>
				</Flex>
				<Image
					borderRadius="full"
					src={avatarUrl}
					fallbackSrc={images.avatar.src}
					position="absolute"
					boxSize="150px"
					left="0"
					right="0"
					top="80%"
					mx="auto"
					objectFit="cover"
					border="4px solid white"
				/>
			</Box>
			<Box w={['100%', '90%', '80%', '75%']} mx="auto">
				<Text align="center" fontSize="lg">
					<chakra.span textTransform="uppercase" fontWeight={700}>
						{name}
					</chakra.span>
				</Text>
				<chakra.article className={styles.blog} mt={10}>
					<MDXRemote {...mdxSource} />
				</chakra.article>
			</Box>
		</Box>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await PostService.getAll()
	const paths = posts.map((post) => ({
		params: { slug: post.slug },
	}))
	return {
		paths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
	const { slug } = context.params as Params
	const post = await PostService.getOneBySlug(slug)
	post.mdxSource = await serialize(post.content)
	return {
		props: { post },
	}
}

export default PostPage
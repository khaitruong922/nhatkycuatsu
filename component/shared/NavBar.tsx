import { Box, Text, Flex, Image, Icon, Link } from '@chakra-ui/react'
import images from 'assets/images'
import React, { FC } from 'react'
import { FaGithub } from 'react-icons/fa'
import NextLink from 'next/link'
import { APP_NAME } from 'core/common/constants'
const NavBar: FC = () => {
	return (
		<Flex
			py={4}
			px={12}
			h="64px"
			position="sticky"
			top={0}
			zIndex={10}
			bgColor="#242424"
			color="white"
			align="center"
		>
			<NextLink href="/">
				<Image
					cursor="pointer"
					mt={0.5}
					h="100%"
					src={images.logo.transparent.src}
				/>
			</NextLink>
			<NextLink href="/">
				<Text
					cursor="pointer"
					ml={3}
					fontWeight={600}
					fontSize="xl"
					userSelect="none"
				>
					{APP_NAME}
				</Text>
			</NextLink>

			<Link
				display="flex"
				alignItems="center"
				ml="auto"
				href="https://github.com/khaitruong922/gem-tech"
			>
				<Icon boxSize="20px" as={FaGithub} />
			</Link>
		</Flex>
	)
}

export default NavBar
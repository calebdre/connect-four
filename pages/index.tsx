import type {NextPage} from 'next'
import {usePlayer} from "../core/persistence";
import React, {useCallback, useState} from "react";
import {Center, ColorPicker, DEFAULT_THEME, TextInput, Button, Avatar, Paper} from '@mantine/core';

/*
   check if there's a user in local storage
    if there is,generate link to a new page
    if there isn't, show name & color input & save it to localstorage

  in parent:
    add currentUser state that is initialized with the user from local storage
    if there is no user, show the input form
    if there is a user, show the link to the game
*/

const RightInputSection = ({color}) => {
	if (color) {
		return (
			<div
				style={{
					backgroundColor: color,
					width: '15px',
					height: '15px',
					borderRadius: '50%',
					opacity: .5
				}}
			/>
		)
	}

	return null
}

const Home: NextPage = () => {
	const {
		value: currentUser,
		setValue: setCurrentUser
	} = usePlayer()

	const [name, setName] = useState<string>('')
	const [color, setColor] = useState<string | undefined>(undefined)

	console.log(color)
	const setPlayerInfo = useCallback(() => {
		if (name.length > 0 && color) {
			setCurrentUser({
				name,
				color
			})
		}
	}, [setCurrentUser, name, color])

	const defaultColor = DEFAULT_THEME.colors.gray[0]
	const rgbaColor = color && color.replace(')', ', 0.1)')
	.replace('rgb', 'rgba')

	console.log(rgbaColor)
	return (
		<Center
			style={{
				height: '100vh',
				width: '100vw'
			}}
		>
			{currentUser === undefined && (
				<Paper
					shadow="md"
					p="lg"
					style={{
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<TextInput
						icon={
							<div
								style={{
									backgroundColor: rgbaColor || undefined
								}}
							>
								<Avatar
									size={20}
									styles={{
										root: {
											backgroundColor: rgbaColor || undefined
										},
										placeholder: {
											backgroundColor: rgbaColor || undefined
										}
									}}
								>
									{name[0]}{name[name.length - 1]}
								</Avatar>
							</div>
						}
						value={name}
						// placeholder={'connect4master'}
						description={'Enter your username'}
						onChange={event => setName(event.currentTarget.value)}
						rightSection={(
							<RightInputSection color={color ? color : DEFAULT_THEME.colors.gray[0]}/>) || undefined}
					/>

					<ColorPicker
						mt={"md"}
						format="rgb"
						value={color}
						onChange={setColor}
						withPicker={false}
						fullWidth
						swatches={[
							...DEFAULT_THEME.colors.red,
							...DEFAULT_THEME.colors.green,
							...DEFAULT_THEME.colors.blue,
						]}
					/>

					<Button
						mt={"md"}
						styles={{
							root: {
								backgroundColor: color ? color : DEFAULT_THEME.colors.blue[9],

								'&:hover': {
									backgroundColor: rgbaColor
								}
							}
						}}
						onClick={setPlayerInfo}
					>
						Create User
					</Button>
				</Paper>
			)}

			{currentUser && (
				<div>
					<p>
						{currentUser.name}
						<span
							style={{
								backgroundColor: currentUser.color,
								display: 'inline-block',
								width: '1rem',
								height: '1rem',
								borderRadius: '50%',
								marginLeft: '1rem'
							}}
						/>
					</p>

					<div
						style={{
							margin: "1rem 0"
						}}
					/>

					<Button>
						Play
					</Button>
				</div>
			)}
		</Center>
	)
}

export default Home

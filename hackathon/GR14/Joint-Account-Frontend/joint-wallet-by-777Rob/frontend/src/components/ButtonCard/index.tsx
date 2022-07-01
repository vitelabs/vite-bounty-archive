import React, { useState, useEffect, Component, ReactComponentElement } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
	title?: string;
	link?: string;
	icon?: React.ReactNode;
	children?: React.ReactNode;
	className?: string;
};

const ButtonCard = ({ title, link, icon, children, className }: Props) => {
	const navigate = useNavigate();
	return (
		<button
			onClick={() => {
				link && navigate(link);
			}}
			className={`select-card opacity-100 ${className}`}
		>
			{icon && <div className="flex justify-center items-center text-gray-500">{icon}</div>}

			{title && (
				<div className="text-center mt-4">
					<h1 className="font-bold text-gray-700 text">{title}</h1>
				</div>
			)}
			{children && children}
		</button>
	);
};

export default ButtonCard;

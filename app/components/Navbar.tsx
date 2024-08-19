import { NavLink } from '@remix-run/react'

const Navbar = () => {
	return (
		<nav className='py-5 px-2 sm-:px-0 bg-stone-300 mb-5'>
			<div className='container mx-auto flex justify-between'>
				<p className='font-extrabold text-2xl tracking-wider'>ShardLab Blog</p>
				<div className='flex gap-8'>
					<NavLink
						to={'/posts'}
						className={({ isActive }) =>
							isActive ? 'text-red-400 font-bold' : ''
						}
					>
						Posts
					</NavLink>
					<NavLink
						to={'/about'}
						className={({ isActive }) =>
							isActive ? 'text-red-400 font-bold' : ''
						}
					>
						About
					</NavLink>
				</div>
			</div>
		</nav>
	)
}

export default Navbar

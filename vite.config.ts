import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		remix({
			basename: '/',
			buildDirectory: 'build',
			routes: async (defineRoutes) => {
				return defineRoutes((route) => {
					// Define the root route
					route('/', 'routes/_index.tsx', { index: true })

					route('/posts/new', 'routes/posts.new.tsx')
					route('/posts/:postId', 'routes/posts.$postId.tsx')
					route('/posts/:postId/edit', 'routes/posts.$postId.edit.tsx')
					route('/posts/:postId/delete', 'routes/posts.$postId.delete.tsx')
				})
			},
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true
			}
		}),
		tsconfigPaths()
	]
})

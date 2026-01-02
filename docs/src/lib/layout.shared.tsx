import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/wanner-work/notion',
    nav: {
      title: (
        <div>
          <p className="text-neutral-600 font-mono">
            @wanner.work/<span className="font-bold pl-0.5">notion</span>
          </p>
        </div>
      )
    }
  }
}

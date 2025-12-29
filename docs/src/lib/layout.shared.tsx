import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/wanner-work/notion',
    nav: {
      title: (
        <div>
          <p className="text-neutral-600 font-mono">
            notion<span className="text-black font-bold pl-0.5">x</span>
          </p>
        </div>
      )
    }
  }
}

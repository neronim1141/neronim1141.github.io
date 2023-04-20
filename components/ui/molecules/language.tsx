interface LanguageProps {
  language: string;
  level: string;
}
export const Language = ({ language, level }: LanguageProps) => (
  <>
    <span className="text-lg font-bold">{language}</span>
    <span className="text-zinc-900 dark:text-zinc-400"> - {level}</span>
  </>
);

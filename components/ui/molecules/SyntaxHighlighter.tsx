import { useClipboard } from "@/lib/hooks/useClipboard";
import { useMounted } from "@/lib/hooks/useMounted";
import clsx from "clsx";
import { useTheme } from "next-themes";
import Highlight, { defaultProps } from "prism-react-renderer";
import vsDark from "prism-react-renderer/themes/vsDark";
import vsLight from "prism-react-renderer/themes/vsLight";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const SyntaxHighlighter = ({ children }: any) => {
  const { resolvedTheme: theme } = useTheme();
  const code = children.props.children;
  const language = children.props.className.split("-")[1];
  const mounted = useMounted();
  const { copy } = useClipboard();
  const handleCopy = () => {
    copy(code, { onSuccess: () => toast("Code copied!", { type: "success" }) });
  };
  if (!mounted)
    return (
      <div className="w-full animate-pulse overflow-hidden whitespace-pre-line rounded-lg bg-zinc-200 p-3 text-transparent dark:bg-zinc-800">
        {code}
      </div>
    );
  return (
    <div className="relative">
      <button
        className={clsx(
          "absolute right-2 top-2 grid h-10 w-10 place-content-center rounded-full",
          "bg-neutral-50 hover:bg-red-400",
          "dark:bg-neutral-950 dark:hover:bg-red-700"
        )}
        onClick={handleCopy}
      >
        <FaCopy />
      </button>
      <Highlight
        {...defaultProps}
        code={code.trim()}
        theme={theme === "dark" ? vsDark : vsLight}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default SyntaxHighlighter;

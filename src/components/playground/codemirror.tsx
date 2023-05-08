import React, { useEffect, useRef, useContext } from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql, updateSchema } from 'cm6-graphql';

import theme from '../../theme';
import { SchemaContext } from '../../contexts';

const requestEditorTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgDarkBlue, gutterBackground: '#0f202d' },
});

const metadataEditorTheme = vscodeDarkInit({
  settings: {
    background: theme.colors.bgBlack,
    gutterBackground: theme.colors.bgBlack,
    lineHighlight: theme.colors.bgBlack,
  },
});

const responseTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgBlue },
});

type CodeMirrorProps = React.ComponentProps<typeof CodeMirror>;

const RequestEditor = React.memo((props: CodeMirrorProps) => {
  const refs = useRef<ReactCodeMirrorRef>({});
  const schema = useContext(SchemaContext);

  useEffect(() => {
    const view = refs.current.view;
    if (!view) return;

    updateSchema(view, schema);
  }, [refs, schema]);

  return <CodeMirror ref={refs} extensions={[graphql()]} theme={requestEditorTheme} {...props} />;
});

const MetadataEditor = React.memo((props: CodeMirrorProps) => {
  return <CodeMirror theme={metadataEditorTheme} {...props} />;
});

const ResponseWindow = React.memo((props: CodeMirrorProps) => {
  return (
    <CodeMirror
      extensions={[graphql()]}
      theme={responseTheme}
      basicSetup={{ lineNumbers: false, foldGutter: false, highlightActiveLine: false }}
      editable={false}
      {...props}
    />
  );
});

export { RequestEditor, MetadataEditor, ResponseWindow };

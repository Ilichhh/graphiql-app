import React, { useEffect, useRef } from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql, updateSchema } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql/type';

import theme from '../../theme';

const requestEditorTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgDarkBlue, gutterBackground: '#0f202d' },
});

const variablesEditorTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgBlack, gutterBackground: theme.colors.bgBlack },
});

const responseTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgBlue },
});

type SchemaProps = {
  schema?: GraphQLSchema;
};

type CodeMirrorProps = React.ComponentProps<typeof CodeMirror> & SchemaProps;

const RequestEditor = React.memo((props: CodeMirrorProps) => {
  const refs = useRef<ReactCodeMirrorRef>({});

  useEffect(() => {
    const view = refs.current.view;
    if (!view) return;

    updateSchema(view, props.schema);
  }, [refs, props.schema]);

  return <CodeMirror ref={refs} extensions={[graphql()]} theme={requestEditorTheme} {...props} />;
});

const MetadataEditor = React.memo((props: CodeMirrorProps) => {
  return <CodeMirror extensions={[graphql()]} theme={variablesEditorTheme} {...props} />;
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

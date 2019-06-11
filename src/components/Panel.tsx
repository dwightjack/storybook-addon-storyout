import * as React from 'react';
import { useState, useEffect } from 'react';
import { Placeholder, SyntaxHighlighter } from '@storybook/components';
import { ClassNames } from '@storybook/theming';
import { UPDATE_SOURCE } from '../constants';
import { format } from '../utils';

export interface PanelProp {
  api: any;
  active: boolean;
}

export function Panel({
  api,
  active,
}): React.FunctionComponentElement<PanelProp> {
  const { parameters = {} } = api.getCurrentStoryData() || {};

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    function onUpdate({ source, language }): void {
      setLanguage(language);
      if (!source) {
        setCode('');
        return;
      }
      setCode(format(source));
    }

    api.on(UPDATE_SOURCE, onUpdate);
    return () => {
      api.off(UPDATE_SOURCE, onUpdate);
    };
  }, [parameters.source]);

  if (!active) {
    return null;
  }

  if (!code || !parameters.source) {
    return <Placeholder>Output not available</Placeholder>;
  }

  return (
    <ClassNames>
      {({ css }) => (
        <SyntaxHighlighter
          language={language}
          bordered
          copyable
          className={css`
            font-size: 0.75rem;

            pre * {
              font-family: Consolas, Monaco, monospace !important;
            }
          `}
        >
          {code}
        </SyntaxHighlighter>
      )}
    </ClassNames>
  );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Placeholder, SyntaxHighlighter } from '@storybook/components';
import { API } from '@storybook/api';
import { ClassNames } from '@storybook/theming';
import { UPDATE_SOURCE } from '../constants';
import { format } from '../utils';
import { SourceUpdateEvent } from '../types';

export interface PanelProp {
  api: API;
  active: boolean;
}

export function Panel({
  api,
  active,
}: PanelProp): React.FunctionComponentElement<PanelProp> | null {
  const data = api.getCurrentStoryData();
  let parameters: Record<string, unknown> = {};

  if ('parameters' in data) {
    parameters = data.parameters;
  }

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');

  useEffect(() => {
    function onUpdate({ source, language }: SourceUpdateEvent): void {
      setLanguage(language);
      if (!source) {
        setCode('');
        return;
      }
      setCode(format(source));
    }

    api.on(UPDATE_SOURCE, onUpdate);
    return (): void => {
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
      {({ css }): React.ReactElement => (
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

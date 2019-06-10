import * as React from 'react';
import { useState, useEffect } from 'react';
import { Placeholder, SyntaxHighlighter } from '@storybook/components';
import { ClassNames } from '@storybook/theming';
import { UPDATE_SOURCE } from '../constants';
import { html as formatHTML } from 'js-beautify';

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

  useEffect(() => {
    function onUpdate({ output }): void {
      if (!output) {
        setCode('');
        return;
      }
      // eslint-disable-next-line @typescript-eslint/camelcase
      setCode(formatHTML(output, { indent_size: 2, unformatted: [] }));
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
    return <Placeholder>HTML output not available</Placeholder>;
  }

  return (
    <ClassNames>
      {({ css }) => (
        <SyntaxHighlighter
          language={'html'}
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

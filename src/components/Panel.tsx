import * as React from 'react';
import { useState, useEffect } from 'react';
import { Placeholder, SyntaxHighlighter } from '@storybook/components';
import { styled } from '@storybook/theming';
import { UPDATE_SOURCE } from '../constants';
import { html as formatHTML } from 'js-beautify';

export interface PanelProp {
  api: any;
  active: boolean;
}

const Wrapper = styled.div`
  font-size: 0.75rem;

  pre * {
    font-family: Consolas, Monaco, monospace !important;
  }
`;

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
    <Wrapper>
      <SyntaxHighlighter language={'html'} bordered copyable>
        {code}
      </SyntaxHighlighter>
    </Wrapper>
  );
}

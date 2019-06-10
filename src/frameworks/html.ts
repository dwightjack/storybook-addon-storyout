export function render(output: any): Element {
  if (output instanceof Element) {
    return output;
  }
  if (typeof output === 'string') {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = output;
    return wrapper.firstElementChild;
  }

  throw new TypeError(
    'Invalid story output format. Supported formats: string, DOM Element',
  );
}

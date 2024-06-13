import { createPluginFactory, ELEMENT_IMAGE, ImagePlugin } from '@udecode/plate';
import { ELEMENT_IMAGE_LINK } from './defaults';
import { withImage } from './withImage';

export const createImagePlugin = createPluginFactory<ImagePlugin>({
  key: ELEMENT_IMAGE,
  isElement: true,
  isVoid: true,
  withOverrides: withImage,
  options: {
    disableCaption: true,
  },
  plugins: [
    {
      key: ELEMENT_IMAGE_LINK,
      isElement: true,
      isVoid: true,
      then: (editor, { type }) => ({
        deserializeHtml: {
          rules: [{ validNodeName: 'IMGLINK' }],
          getNode: el => ({
            type,
            url: el.getAttribute('src'),
            href: el.getAttribute('href'),
          }),
        },
        serializeHtml: ({ element }) => {
          const width = element.width;
          return (
            <a rel="noreferrer noopener" target="_blank" href={element.href as string}>
              <img
                src={element.url as string}
                alt=""
                style={{
                  width: typeof width === 'string' || typeof width === 'number' ? width : undefined,
                  marginTop: 8,
                }}
              />
            </a>
          );
        },
      }),
    },
  ],
  then: (_, { type }) => ({
    deserializeHtml: {
      rules: [
        {
          validNodeName: 'IMG',
        },
      ],
      getNode: el => ({
        type,
        url: el.getAttribute('src'),
      }),
    },
    serializeHtml: ({ element }) => {
      const width = element.width;
      return (
        <img
          src={element.url as string}
          alt=""
          style={{
            width: typeof width === 'string' || typeof width === 'number' ? width : undefined,
            marginTop: 8,
          }}
        />
      );
    },
  }),
});

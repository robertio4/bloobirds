export const EXAMPLES = Object.freeze({
  targetMarket_other: {
    EN: {
      description:
        'We are ACME, a company that sells cybersecurity products. The most popular product that we have is Iced Mango, ' +
        'it is only one product per company and we don’t have a huge potential of upselling.\n' +
        '\n' +
        'Our Target market is mainly Small-Medium E-commerce and Market Places in Europe. We are having huge success in the UK and Germany.\n' +
        '\n' +
        'The Iced Mango is a ”rounded” product that everybody knows, with a competitive price and a clear value proposition.\n' +
        '\n' +
        'Our Marketing team generates a large volume of leads and the sales team has lots of open opportunities and high activity rates.\n',
      examples: [
        {
          title: 'E-commerce UK',
          shortname: 'EUK',
          subtitle: 'Small-medium E-commerce in UK',
          segmentation: [
            {
              title: 'Size',
              values: ['50-100 employees'],
            },
            {
              title: 'Country',
              values: ['UK'],
            },
            {
              title: 'Industry',
              values: ['Food', 'Sports', 'Cosmetics'],
            },
          ],
        },
        {
          title: 'E-commerce Germany',
          shortname: 'EG',
          subtitle: 'Small-medium E-commerce in Germany',
          segmentation: [
            {
              title: 'Size',
              values: ['50-100 employees'],
            },
            {
              title: 'Country',
              values: ['Germany'],
            },
            {
              title: 'Industry',
              values: ['Food', 'Sports', 'Cosmetics'],
            },
          ],
        },
        {
          title: 'Marketplaces UK',
          shortname: 'MUK',
          subtitle: 'Small-medium Marketplaces in UK',
          segmentation: [
            {
              title: 'Size',
              values: ['50-100 employees'],
            },
            {
              title: 'Country',
              values: ['UK'],
            },
            {
              title: 'Industry',
              values: ['Retail', 'Supermarkets'],
            },
          ],
        },
        {
          title: 'Marketplaces Germany',
          shortname: 'MG',
          subtitle: 'Small-medium Marketplaces in Germany',
          segmentation: [
            {
              title: 'Size',
              values: ['50-100 employees'],
            },
            {
              title: 'Country',
              values: ['Germany'],
            },
            {
              title: 'Industry',
              values: ['Retail', 'Supermarkets'],
            },
          ],
        },
      ],
    },
    ES: {
      description:
        'Somos ACME, una empresa especializada en productos de ciberseguridad. Tenemos múltiples productos que dan solución a grandes empresas del sector de la banca y de las aseguradoras.\n' +
        '\n' +
        'Aunque nuestro producto de entrada es Tropical Peach que suele tener muy buena acogida en los equipos de IT. ' +
        'Solemos tener otros productos que encajan con los departamentos de ventas y de recursos humanos.\n' +
        '\n' +
        'Un mismo ventas puede llevar un número limitado de clientes y solemos organizar a los equipos por territorios, nuestros principales mercados son España e Italia.\n',
      examples: [
        {
          title: 'Banca España',
          shortname: 'BE',
          subtitle: 'Gran empresa de banca en España',
          segmentation: [
            {
              title: 'Tamaño',
              values: ['5-100 employees'],
            },
            {
              title: 'Industria',
              values: ['Machinery', 'Health'],
            },
            {
              title: 'País',
              values: ['Spain'],
            },
          ],
        },
        {
          title: 'Aseguradoras en España',
          shortname: 'AE',
          subtitle: 'Empresas aseguradoras en España',
          segmentation: [
            {
              title: 'Tamaño',
              values: ['+5000 employees'],
            },
            {
              title: 'Industria',
              values: ['Insurance'],
            },
            {
              title: 'País',
              values: ['Spain'],
            },
          ],
        },
        {
          title: 'Banca Italia',
          shortname: 'BI',
          subtitle: 'Gran empresa de banca en Italia',
          segmentation: [
            {
              title: 'Tamaño',
              values: ['+5000 employees'],
            },
            {
              title: 'Industria',
              values: ['Banking'],
            },
            {
              title: 'País',
              values: ['Italia'],
            },
          ],
        },
        {
          title: 'Aseguradoras en Italia',
          shortname: 'AI',
          subtitle: 'Empresas aseguradoras en España',
          segmentation: [
            {
              title: 'Tamaño',
              values: ['+5000 employees'],
            },
            {
              title: 'Industria',
              values: ['Insurance'],
            },
            {
              title: 'País',
              values: ['Italy'],
            },
          ],
        },
      ],
    },
  },
  buyerPersona_other: {
    EN: {
      description:
        'The Buyer persona who will use the Ice Mango product will be the one who will have to accept and validate that the product solves their daily problem. ' +
        'This is one of the key profiles to identify and prospect for. This is the Security Analyst\n' +
        '\n' +
        '\n' +
        'When scheduling the meeting we will need to involve the person who has the power to sign the agreement, in this type of company the profile is the IT Manager.\n',
      examples: [
        {
          title: 'Security Analyst',
          shortname: 'SA',
          segmentation: [
            {
              title: 'Function',
              values: ['IT'],
            },
            {
              title: 'Buying Role',
              values: ['User'],
            },
            {
              title: 'Position Level',
              values: ['Team member'],
            },
          ],
        },
        {
          title: 'IT Manager',
          shortname: 'IT',
          segmentation: [
            {
              title: 'Function',
              values: ['IT'],
            },
            {
              title: 'Buying Role',
              values: ['Decision maker'],
            },
            {
              title: 'Position Level',
              values: ['C-Level'],
            },
          ],
        },
      ],
    },
    ES: {
      description:
        'El Producto Tropical Peach será usado por el perfil de Agente de ventas, será importante que vea el valor que le aporta y los problemas que ' +
        'le resuelve en su día a día y es uno de los principales Buyer Personas a convencer en el proceso de ventas.\n' +
        '\n' +
        '\n' +
        'A la hora de agendar el meeting necesitaremos involucrar al Director de tecnología porque aunque no usará el producto, será quién firme el acuerdo.\n' +
        '\n' +
        'Tenemos posibilidad de vender otros productos en los departamentos de ventas y recursos humanos, donde los perfiles a prospectar serán los agentes de ventas y directores comerciales.\n',
      examples: [
        {
          title: 'Analista de seguridad',
          shortname: 'AS',
          segmentation: [
            {
              title: 'Función',
              values: ['Tecnología'],
            },
            {
              title: 'Rol de compra',
              values: ['Usuario'],
            },
            {
              title: 'Nivel de posición',
              values: ['Miembro de equipo'],
            },
          ],
        },
        {
          title: 'Director de Tecnología',
          shortname: 'DT',
          segmentation: [
            {
              title: 'Función',
              values: ['Tecnología'],
            },
            {
              title: 'Rol de compra',
              values: ['Decisor'],
            },
            {
              title: 'Nivel de posición',
              values: ['C-Level'],
            },
          ],
        },
        {
          title: 'Agente de ventas',
          shortname: 'AV',
          segmentation: [
            {
              title: 'Función',
              values: ['Tecnología'],
            },
            {
              title: 'Rol de compra',
              values: ['Decisor'],
            },
            {
              title: 'Nivel de posición',
              values: ['C-Level'],
            },
          ],
        },
        {
          title: 'Director Comercial',
          shortname: 'AS',
          segmentation: [
            {
              title: 'Función',
              values: ['Ventas'],
            },
            {
              title: 'Rol de compra',
              values: ['Decisor (Budget)'],
            },
            {
              title: 'Nivel de posición',
              values: ['Cargo directivo'],
            },
          ],
        },
      ],
    },
  },
});

module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      fontSize: {
        '7xl': '6rem',
        yuge: "14vw"
      },
      colors: {
        midGray: '#131B2A'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            fontWeight: 200,
            a: {
              color: 'inherit',
              textDecoration: 'none',
              fontWeight: theme('fontWeight.extralight')
            },
            'h2, h3, h4, h5': {
              fontSize: theme('fontSize.3xl'),
              fontWeight: theme('fontWeight.extrabold'),
              marginBottom: theme('margin.5')
            },
            h3: {
              fontSize: theme('fontSize.2xl')
            },
            h4: {
              fontSize: theme('fontSize.xl')
            },
            ul: {
              paddingLeft: theme('padding.6')
            },
            'ul > li::before': {
              backgroundColor: theme('colors.gray.700'),
            },
            'ol > li::before': {
              color: theme('colors.gray.700'),
            },
            code: {
              fontWeight: 'inherit',
              color: theme('colors.gray.700'),
              borderRadius: theme('border.sm'),
              padding: theme('padding.1'),
              fontFamily: "'Public Sans', sans-serif",
              background: theme('colors.gray.200')
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('precss')
  ]
}

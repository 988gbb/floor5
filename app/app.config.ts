export default defineAppConfig({
  ui: {
    colors: {
      primary: 'ink',
      neutral: 'warm',
      success: 'success',
      warning: 'warning',
      error: 'error',
      info: 'info'
    },
    button: {
      slots: {
        base: 'font-display font-semibold rounded-md'
      }
    },
    card: {
      slots: {
        root: 'rounded-2xl'
      }
    }
  }
})

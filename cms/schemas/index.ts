import manufacturer from './manufacturer'
import collection from './collection'
import variant from './variant'
import product from './product'

/**
 * Nacrt Sanity šeme za Floor5 CMS model (Proizvođač → Kolekcija → Proizvod → Varijanta).
 * Ovo NIJE povezan Sanity projekat — samo šema spremna da se ubaci u `sanity.config.ts`
 * kada se kreira Sanity Studio (vidi README.md, sekcija "Sledeći koraci").
 */
export const schemaTypes = [manufacturer, collection, variant, product]

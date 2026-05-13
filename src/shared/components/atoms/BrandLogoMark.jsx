import { cn } from '../../utils/cn'

const LOGO_SRC = '/photos/logo_academia.png'

/**
 * Marca Academia Creeser — raster oficial (`public/photos/logo_academia.webp`).
 *
 * @param {{ variant?: 'lightBg' | 'darkBg', className?: string }} props
 */
const BrandLogoMark = ({ variant = 'lightBg', className }) => (
  <img
    src={LOGO_SRC}
    alt=""
    aria-hidden
    decoding="async"
    className={cn(
      'shrink-0 object-contain object-center',
      className
    )}
  />
)


export default BrandLogoMark

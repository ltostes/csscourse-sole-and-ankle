import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const BANNER_STYLES = {
    'on-sale' : {
      backgroundColor: COLORS.primary,
      message: 'Sale',
    },
    'new-release' : {
      backgroundColor: COLORS.secondary,
      message: 'Just Released!',
    },
  }
  
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={variant == 'on-sale'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant == 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
        {variant == 'on-sale' ? <Banner style={{'--background-color' : BANNER_STYLES[variant].backgroundColor}}>{BANNER_STYLES[variant].message}</Banner> : 
         variant == 'new-release' ? <Banner style={{'--background-color' : BANNER_STYLES[variant].backgroundColor}}>{BANNER_STYLES[variant].message}</Banner> :  
         null}
    </Link>
  );
};

const Link = styled.a`
  position: relative;
  text-decoration: none;
  color: inherit;
  isolation: isolate;
`;

const Wrapper = styled.article`
  position: relative;
`;

const Banner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 12px;
  margin-right: -4px;
  
  padding: 9px;
  border-radius: 2px;

  background-color: var(--background-color);
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.medium};
  font-size: 14px;
`

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: ${p => p.onSale ? 'line-through' : 'none'};
  color: ${p => p.onSale ? COLORS.gray['700'] : 'inherit'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;

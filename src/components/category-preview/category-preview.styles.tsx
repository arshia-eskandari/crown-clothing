import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const CategoryPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

export const StyledLink = styled(Link)`
    font-size: 28px;
    cursor: pointer;
`;

export const Preview = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;

    @media screen and (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 15px;
        grid-row-gap: 25px;
    }
    @media screen and (max-width: 400px) {
        grid-template-columns: 1fr;
        grid-row-gap: 25px;
    }
`;

export const TitleH2 = styled.h2`
    margin: auto;
    margin-bottom: 25px;
`;

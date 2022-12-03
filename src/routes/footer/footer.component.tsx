import { FooterContainer } from './footer.styles';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <FooterContainer>
            <hr />
            <i>
                <b>Copyright &copy; {year} Crown Clothing</b>
            </i>
        </FooterContainer>
    );
};

export default Footer;

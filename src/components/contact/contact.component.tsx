import {
    ContactContainer,
    DescContainer,
    BackgroundImage,
    Body,
    StyledAnchorTag,
} from './contact.styles';

const Contact = () => {
    return (
        <ContactContainer>
            <h2>About Us</h2>
            <DescContainer>
                <BackgroundImage
                    imageUrl={
                        'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                />
                <Body>
                    <h2>Crown Clothing</h2>
                    <p>
                        We are humbled by the Crown Clothing community and proud
                        of providing quality and fashionable clothing.
                    </p>
                    <h2>Contact Info</h2>
                    <p>
                        For more information, email{' '}
                        <StyledAnchorTag href="mailto:crwn@customerservice.com">
                            crwn@customerservice.com
                        </StyledAnchorTag>{' '}
                        or call{' '}
                        <StyledAnchorTag href="tel:202-555-0128">
                            202-555-0128
                        </StyledAnchorTag>
                        . To see our latest products, follow our{' '}
                        <StyledAnchorTag
                            href="https://www.instagram.com/explore/tags/fashion/?hl=en"
                            rel="noreferrer"
                            target="_blank"
                        >
                            instagram
                        </StyledAnchorTag>{' '}
                        page.
                    </p>
                </Body>
            </DescContainer>
        </ContactContainer>
    );
};

export default Contact;

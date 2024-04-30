import PropTypes from 'prop-types';

const PostcodeForm = ({ input, setInput, handleSubmit }) => (
    <form onSubmit={handleSubmit} aria-label="Postcode Form">
        <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter postcode"
            aria-label="Postcode Input"
        />
        <button type="submit">Get Weather</button>
    </form>
);

PostcodeForm.propTypes = {
    input: PropTypes.string.isRequired,
    setInput: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default PostcodeForm;
namespace Efforeignkeytask.DATA_TransferObject
{
    public class UserDetailsRequestDto:UserRequestDto
    {
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Address { get; set; }
        public int UserId { get; set; }
    }
}

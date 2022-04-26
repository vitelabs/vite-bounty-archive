using System;
using System.Linq;

namespace VITC.Shared.DataTypes
{
    public class PublicAddress
    {
        public const string Default = "vite_34e439bd849306edd61f24d9d1da35040b576bf014a13cb9a0";
        const string Prefix = "vite_";
        public string Address { get; }
        public PublicAddress(string address)
        {
            Validate(address);

            Address = address;
        }

        public static bool IsPublicAddress(string @string)
        {

            return @string.StartsWith(Prefix);
        }

        private void Validate(string address)
        {
            if (!IsPublicAddress(address))
              throw new ArgumentException("Incorrect address provided");
        }

        public override string ToString()
        {
            return Address;
        }

        public static implicit operator PublicAddress(string address)
        {
            return new PublicAddress(address);
        }
        
        public override int GetHashCode()
        {
            return HashCode.Combine(Address);
        }

        public override bool Equals(object obj)
        {
            return obj is PublicAddress address &&
                   Address == address.Address;
        }
    }
}

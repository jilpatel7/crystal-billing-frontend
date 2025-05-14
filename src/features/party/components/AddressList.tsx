import { Dispatch, SetStateAction } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";
import { PartyFormSchema } from "../validation-schema/partySchema";
import FormSection from "../../../components/ui/FormSelection";
import Button from "../../../components/ui/Button";
import TextInput from "../../../components/ui/TextInput";

interface AddressListProps {
  setRemoveAddressIds: Dispatch<SetStateAction<number[]>>;
}

const AddressList = ({ setRemoveAddressIds }: AddressListProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<PartyFormSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "party_addresses",
    keyName: "_internalId",
  });

  const handleAddAddress = () => {
    append({
      id: null,
      address: "",
      landmark: "",
      pincode: "",
    });
  };

  const addressErrors = errors.party_addresses;

  return (
    <FormSection
      title="Addresses"
      subtitle="Add one or more addresses"
      icon="map"
    >
      <div className="space-y-4">
        {fields.map((field, index) => {
          const addressError = addressErrors?.[index];

          return (
            <div
              key={field.id}
              className={`bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                addressError ? "border-red-300" : "border-indigo-100"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Address #{index + 1}
                </h3>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      console.log(field);
                      if (field.id) {
                        setRemoveAddressIds((prev) => [
                          ...prev,
                          field.id as number,
                        ]);
                      }
                      remove(index);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <TextInput
                    name={`party_addresses.${index}.address`}
                    label="Address"
                    placeholder="Enter full address"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <TextInput
                    name={`party_addresses.${index}.landmark`}
                    label="Landmark"
                    placeholder="Enter nearby landmark"
                    required
                  />
                </div>

                <TextInput
                  name={`party_addresses.${index}.pincode`}
                  label="Pincode"
                  placeholder="Enter 6-digit pincode"
                  required
                />
              </div>

              {addressError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">
                    Please fill in all required fields for this address
                    correctly
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddAddress}
          icon={<PlusCircle size={18} />}
          className="w-full md:w-auto flex items-center"
        >
          Add Another Address
        </Button>
      </div>
    </FormSection>
  );
};

export default AddressList;

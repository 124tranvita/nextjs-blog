import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  options: object;
  type?: string;
  placeholder?: string;
};

export default function Input({
  name,
  label,
  options,
  type = "text",
  placeholder = "",
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = errors && errors[name] && errors[name]?.message;
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        {...register(name, { ...options })}
      />
      {hasError && (
        <p className="mt-2 text-sm text-red-800">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}

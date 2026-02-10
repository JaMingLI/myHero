import type { ComponentType, JSX } from "react";

/**
 * MVVM Binder HOC
 *
 * Connects a ViewController (pure UI component) with a ViewModel (hook with logic).
 * The ViewModel receives props and returns data/handlers that are spread to the ViewController.
 *
 * @example
 * ```tsx
 * const UserViewModel = ({ userId }: UserProps) => {
 *   const { data } = useQuery(...);
 *   return { userId, user: data };
 * };
 *
 * function UserViewController({ userId, user }: IUserViewModel) {
 *   return <div>{user?.fullName}</div>;
 * }
 *
 * export const User = bind(UserViewController, UserViewModel);
 * ```
 */
export function bind<TProps extends object, TViewModel extends TProps>(
  ViewController: ComponentType<TViewModel>,
  useViewModel: (props: TProps) => TViewModel
): ComponentType<TProps> {
  function BoundComponent(props: TProps) {
    const viewModel = useViewModel(props);
    return <ViewController {...(viewModel as TViewModel & JSX.IntrinsicAttributes)} />;
  }

  // Set display name for React DevTools
  const viewControllerName =
    ViewController.displayName || ViewController.name || "Component";
  BoundComponent.displayName = `Bound(${viewControllerName})`;

  return BoundComponent;
}
